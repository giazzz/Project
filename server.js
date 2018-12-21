var express = require('express');
var app = express();
var router = express.Router();
// var chuyenthanhOfjectId = require('mongodb').$oid;
//dung de chay cac file tinh html
//----------------------------------
app.use(express.static('public'));
//-------------------------------------
app.listen(3003,function(){
	console.log("Server is running!!!")
});

var bodyParser = require('body-parser');
var multer = require("multer");
const multerConfig = {
    
	storage: multer.diskStorage({
	 //Setup where the user's file will go
	 destination: function(req, file, next){
	   next(null, './public/uploads');
	   },   
	    
	    //Then give the file a unique name
	    filename: function(req, file, next){
	        next(null, file.originalname);
	      }
	    }),   
	    
	    //A means of ensuring only images are uploaded. 
	    fileFilter: function(req, file, next){
	          if(!file){
	            next();
	          }
	        const image = file.mimetype.startsWith('image/');
	        if(image){
	          //console.log('photo uploaded');
	          next(null, true);
	        }else{
	          //console.log("file not supported");
	          
	          //TODO:  A better message response to user on failure.
	          return next();
	        }
	    }
  };

var upload = multer(multerConfig);  
// parse application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json 
app.use(bodyParser.json());

var mongodb = require('mongodb');

var MongoClient = mongodb.MongoClient;

var url = 'mongodb://root:root123@ds024748.mlab.com:24748/eproject';

// Use connect method to connect to the Server
MongoClient.connect(url, function (err, db) {
  if (err) {
    console.log('Unable to connect to the mongoDB server. Error:', err);
  } else {
    //HURRAY!! We are connected. :)
    console.log('Connection established to', url);
    var database = db.db();
    var collection = database.collection("products");
    var type = database.collection("type");

    //do some work here with the database.
//     	var type1 = {
//     		id: "40",
//     		name: "candy crush saga"
//     	};
//     	//INSERT 
//     	type.insert([type1], function (err, result) {
// 		      if (err) {
// 		        console.log(err);
// 		      } else {
// 		        console.log('Inserted');
// 		      }
// 	      //Close connection
//     	});
// //-----------------------------------------------------------------------------------------
    	// UPDATE student with id =1:
		// collection.update({id:1}, {$set: {student_name: 'Ha Ha Ha', birthday:'1999-12-10'}}, function (err, UpdateObj) {
		//   if (err) {
		//     console.log(err);
		//   } else if (UpdateObj) {
		//   	if(UpdateObj.result.nModified > 0){
		//   		console.log('Updated Successfully');
		//   	}else{
		//     	console.log('No document found with defined "find" criteria!');
		//   	}
		//   }
		//   //Close connection
		//   db.close();
		// });
//--------------------------------------------------------------------------------------
	//Xoa type
	app.get("/xoa/:idloai",function(req,res,next){
		// res.send("idsp is set to " + req.params.idsp);
        var idcanxoa = req.params.idloai;
        res.send("ID can xoa da lay dc = "+idcanxoa);
		type.deleteOne({id: idcanxoa}, function (err,res) {
	        if (err) {
            res.send("error");
         } else {
            // res.send('Inserted');
	        // res.redirect('/index.html#!/loai');
	        console.log('delete success: ' + res.result.n + ' record');
          }
	    });

   });
	//Xoa sp
	app.get("/xoasp/:idsp",function(req,res,next){
		// res.send("idsp is set to " + req.params.idsp);
        var idcanxoa = req.params.idsp;
        res.send("ID can xoa da lay dc = "+idcanxoa);
		collection.deleteOne({id: idcanxoa}, function (err,res) {
	        if (err) {
            res.send("error");
         } else {
         	// res.redirect('/index.html#!/sp');
	        console.log('delete success: ' + res.result.n + ' record');
            // res.send('Inserted');
          }
          
         	
	    });
   });
//sua du lieu loai
	app.get("/sua/:idloai",function(req,res,next){
		// res.send("idsp is set to " + req.params.idsp);
        var idcansua = req.params.idloai;
        res.send("ID can sua da lay dc = "+idcansua);
		//truy van du lieu co id can sua
		type.find({id:idcansua}).toArray(function (err, result) {
		      if (err) {
		        console.log(err);
		      } else if (result.length) {
		        console.log('Found:', result);
		      } else {
		        console.log('No document(s) found with defined "find" criteria!');
		      }
		    });
		app.get("/typeedit", function(req,res){
				type.find({id:idcansua}).toArray(function (err, result) {
			      if (err) {
			        res.send({
			        	status: 0,
			        	message:'fail'
			        });
			      } else {
			        if (result.length){
			        	res.send({
				        	status: 0,
				        	message:'Successfully!',
				        	data: result
			        	});
			        }else{
			        	res.send({
				        	status: 0,
				        	message:'Successfully!',
				        	data: []
			        	});
			        }
			      }

			    });
		  	});
		 app.post("/update-products",upload.single("image"),function(req,res){
	        var name = req.body.name;
	        // res.send(idcansua);
	        type.updateOne({id:idcansua}, {$set: {id:idcansua, name:name}}, function (err,res) {
		        if (err) throw err;
		        // res.send('update success: ' + res.result.nModified + ' record');
		        console.log('update success: ' + res.result.nModified + ' record');
		    });
	    });

   });
	//edit giang

 		
//------------------------------------------------------------------------------------------
		// //LIET KE Object id = 1 (nếu để trống <=> ko truyền tham số => liệt kê tất cả)
		// collection.find({type:'dairy'}).toArray(function (err, result) {
		//       if (err) {
		//         console.log(err);
		//       } else if (result.length) {
		//         console.log('Found:', result);
		//       } else {
		//         console.log('No document(s) found with defined "find" criteria!');
		//       }
		//       //Close connection
		//       db.close();
		//     });
  //   //Close connection
  //   db.close();
//-----------------------------------------------------------------------------------------------
	//TAO Link API lay toan bo sp
  	app.get("/all_product", function(req,res){
		collection.find({}).toArray(function (err, result) {
	      if (err) {
	        res.send({
	        	status: 0,
	        	message:'fail'
	        });
	      } else {
	        if (result.length){
	        	res.send({
		        	status: 0,
		        	message:'Successfully!',
		        	data: result
	        	});
	        }else{
	        	res.send({
		        	status: 0,
		        	message:'Successfully!',
		        	data: []
	        	});
	        }
	      }

	    });
  	});
  	//Tao link api lay type
  	app.get("/type", function(req,res){
		type.find({}).toArray(function (err, result) {
	      if (err) {
	        res.send({
	        	status: 0,
	        	message:'fail'
	        });
	      } else {
	        if (result.length){
	        	res.send({
		        	status: 0,
		        	message:'Successfully!',
		        	data: result
	        	});
	        }else{
	        	res.send({
		        	status: 0,
		        	message:'Successfully!',
		        	data: []
	        	});
	        }
	      }

	    });
  	});

  	//them sp
  	 app.post("/save-products",upload.single("image"),function(req,res){
        var originalFileName = req.file.originalname;
        var id = req.body.id;
        var name = req.body.name;
        var rating = req.body.rating;
        var desc = req.body.desc;
        var type = req.body.type;
		var price = req.body.price;
		var comment = req.body.comment;
        var image_link = "/uploads/"+originalFileName;
        var product = {
            id: id,
            name: name,
            rating: rating,
            desc: desc,
            type: type,
            price: price,
			comment: comment,
            image_link: image_link
        };
        collection.insert([product], function (err, result) {
          if (err) {
            res.send("error");
         } else {
         	res.redirect('/index.html#!/sp');
            // res.send('Inserted');
          }
        });
    });
  	 //sua sp
/*  	 app.post("/updateloai",upload.single("image"),function(req,res){
        var originalFileName = req.file.originalname;
        var id = req.body.id;
        var name = req.body.name;
        var rating = req.body.rating;
        var desc = req.body.desc;
        var type = req.body.type;
		var price = req.body.price;
		var comment = req.body.comment;
        var image_link = "/uploads/"+originalFileName;
        colsole.log(name);
        collection.update({id:id}, {$set: {student_name: 'Ha Ha Ha', birthday:'1999-12-10'}}, function (err, UpdateObj) {
		  if (err) {
		    console.log(err);
		  } else if (UpdateObj) {
		  	if(UpdateObj.result.nModified > 0){
		  		console.log('Updated Successfully');
		  	}else{
		    	console.log('No document found with defined "find" criteria!');
		  	}
		  }
		  //Close connection
		  db.close();
		});
    });*/
  	//them loai
  	app.post("/save-types",upload.single("image"),function(req,res){
        var id = req.body.id;
        var name = req.body.name;
        var loai = {
            id: id,
            name: name,
        };
        type.insert([loai], function (err, result) {
          if (err) {
            res.send("error");
         } else {
         	res.redirect('/index.html#!/loai');
            // res.send('Inserted');
          }
        });
    });




  }
});