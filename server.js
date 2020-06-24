var express = require('express')
var MongoClient = require('mongodb').MongoClient
var ObjectId = require('mongodb').ObjectId
var bodyParser = require('body-parser')
var logger = require('morgan')
var path = require('path')

var app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


//MONGO URI
const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://Ryand123:Ryand123@mongo-cluster-gxhr2.gcp.mongodb.net/assignment?retryWrites=true"

//Routes

app.post('/image/add', (req, res, next)=>{

	MongoClient.connect(MONGO_URI, (err, client)=>{

		var imagedb = client.db("assignment").collection('image')

		var image = {
			url : req.body.url,
			name : req.body.name,
			type : req.body.type
		}

		imagedb.insertOne(image, (err, success)=>{
		
			if(err){
				res.status(501).json({"msg" : "Error in adding image"});
			} else {
				res.status(200).json(success.ops[0]);
			}
		});
	});
})


//Get Image
app.get('/image', (req, res, next)=>{

	var limit, name, offset;
	var imageArray = new Array()

	if(req.query.nameString != undefined){
		name = req.query.nameString
	}

	if(req.query.limit != undefined){
		limit = req.query.limit
	}

	if(req.query.offset != undefined){
		offset = req.query.offset
	}


	MongoClient.connect(MONGO_URI, (err, client)=>{
	
		var imagedb = client.db('assignment').collection('image')
		
		if(name != undefined){
			
			var i;
			imagedb.find({}).toArray((err, image)=>{
			
				i = 0;
				j = 0;
				
				for(let im in image){
				
					if(image[im].name == name){
						j = j + 1
						if(imageArray == undefined){
							imageArray = [image[im]]
						} else {
							imageArray.push(image[im])
						}
					}
					i = i + 1;
					if(((j == limit)&&(limit != undefined))||(i == image.length)){
                                                        res.status(200).json(imageArray);
							break;
                                         }
				}
			});


		} else {
			imagedb.find({}).toArray((err, image)=>{
			
				var j = 0;
                                for(let im in image){

					j = j + 1
                        	        if(imageArray == undefined){
                                		imageArray = [image[im]]
	                                } else {
                                                imageArray.push(image[im])
        	                        }

					if(((j == limit)&&(limit != undefined))||(j == image.length)){
                                                        res.status(200).json(imageArray);
                                                        break;
                                         }
                                }


			});
		}
	})
});


//Start App
app.listen(process.env.PORT || 3000, ()=>{
	console.log(`Server Listening at port ${process.env.PORT | 3000}`);
})

app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  console.log("Message: ",err.message);
  console.log("ERROR: ",res.locals.error);
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
