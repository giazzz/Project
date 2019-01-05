var express = require('express');
var app = express();
var router = express.Router();
const notifier = require('node-notifier');
// var mongoose         = require('mongoose');
// var mongoosePaginate = require('mongoose-paginate-v2');
// var cookie = require('cookie');
var session = require('express-session');
var http = require('http').Server(app);
var io = require('socket.io')(http);


app.use(session({
  secret: 'nguyen',
  resave: false,
  saveUninitialized: true
  
}))
 


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
	   next(null, './public/backend/uploads');
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
    var user = database.collection("user");

    //Pagination
 //    var mySchema = new mongoose.Schema({ 
 //    id: 'string', 
 //    name: 'string'
	// });
 
	// mySchema.plugin(mongoosePaginate);
	// var myModel = mongoose.model('type',  mySchema); 
	// 			// myModel.paginate().then({})
	// 			const options = {
	// 		    page: 1,
	// 		    limit: 9
	// 				};

	//--------------------------------------------------------------------------------------
	//Xoa type
	app.get("/xoaloai/:idloai",function(req,res,next){
		// res.send("idsp is set to " + req.params.idsp);
        var idcanxoa = req.params.idloai;
        // res.send("ID can xoa da lay dc = "+idcanxoa);
		type.deleteOne({id: idcanxoa}, function (err,res) {
	        if (err) {
	        notifier.notify('Thất bại!');
            res.send("error");

         } else {
         	notifier.notify('Xóa thành công!');
            // res.send('Inserted');
	        console.log('delete success: ' + res.result.n + ' record');
          }
	    });
		res.redirect('/backend/index.html#!/loai');
   	});
	//Xoa sp
	app.get("/xoasp/:idsp",function(req,res,next){
		// res.send("idsp is set to " + req.params.idsp);
        var idcanxoa = req.params.idsp;
        // res.send("ID can xoa da lay dc = "+idcanxoa);
		collection.deleteOne({id: idcanxoa}, function (err,res) {
	        if (err) {
	        notifier.notify('Thất bại!');
            res.send("error");

         } else {
         	notifier.notify('Xóa thành công!');
	        console.log('delete success: ' + res.result.n + ' record');
          }
	    });
		res.redirect('/backend/index.html#!/sp');
   	});
	//-------------------------------------------------------------------------------------	
	//sua du lieu loai
		//lay du lieu tu form day len CSDL
		app.post("/update_types",upload.single("image"),function(req,res){
			var idcansua = req.body.id;
	        var name = req.body.name;
	        console.log(idcansua);
	        console.log(name);
	        type.updateOne({id:idcansua}, {$set: {id:idcansua, name:name}}, function (err,res) {
		        if (err) throw err;
		        console.log('update success: ' + res.result.nModified + ' record');
		    });
		    notifier.notify('Sửa thành công!');
		    res.redirect('/backend/index.html#!/loai');
	    });
   	// });
	//sua du lieu sp
		app.post("/update-products",upload.single("image"),function(req,res){
	        var originalFileName = req.file.originalname;
	        var idcansua = req.body.id;
	        var name = req.body.name;
	        var rating = req.body.rating;
	        var desc = req.body.desc;
	        var type = req.body.type;
			var price = req.body.price;
			var comment = req.body.comment;
	        var image_link = "/backend/uploads/"+originalFileName;
	        collection.updateOne({id:idcansua}, {$set: {id:idcansua, name:name, rating:rating, desc:desc, type:type, price:price, comment:comment, image_link:image_link}}, function (err,res) {
		        if (err) throw err;
		        console.log('update success: ' + res.result.nModified + ' record');
		    });
		    notifier.notify('Sửa thành công!');
		    
	    });
 		
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
  	//-------------------------------------------------------------------------------------------------
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
        var image_link = "/backend/uploads/"+originalFileName;
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
          	notifier.notify('Thất bại!');
            res.send("error");
         } else {
         	notifier.notify('Thêm thành công!');
         	res.redirect('/backend/index.html#!/sp');
            // res.send('Inserted');
          }
        });
    });

  	//them loai
  	app.post("/save-types",upload.single("image"),function(req,res){
        var id = req.body.id;
        var name = req.body.name;
        var loai = {
            id: id,
            name: name,
        };
        console.log(loai);
        console.log(id);
        console.log(name);
        type.insert([loai], function (err, result) {
          if (err) {
          	notifier.notify('Thất bại!');
            res.send("error");
         } else {
         	// String
			notifier.notify('Thêm thành công!');
         	// res.send('<h1>Inserted</h1>');
         	res.redirect('/backend/index.html#!/loai');

          }
        });
    });
  	//--------------------------------------------------------------------------
	// Count sl loai
	// app.get('/counttype', function (req, res) {
	// 	type.find({}).count(function (e, count) {
	//       res.json([{count:count}]);
	//     });

	// })
	// // Count sl sp
	// app.get('/countproduct', function (req, res) {
	// 	collection.find({}).count(function (e, count) {
	//       res.json([{count:count}]);
	//     });

	// })
	// app.get('/sanpham/:a',function(req, res, next){
	// 	res.send('Day la trang san pham');
	// });

	//SIGN IN
	app.post("/sign_in",upload.single("image"),function(req,res){
		var usernamesign = req.body.username;
	    var passwordsign = req.body.password;
	    user.find({username: usernamesign, password: passwordsign}).toArray(function (err, result) {
	      if (err) {
	        res.send({
	        	status: 0,
	        	message:'fail'
	        });
	      } else {
	        if (result.length){
	        	
	        	app.get("/user", function(req,res){
					res.send({
		        	status: 0,
		        	message:'Successfully!',
		        	data: result
	        		});
	        		// console.log(result);
			  	});
	        	res.redirect('/backend/index.html')

	        }else{
	        	notifier.notify('Nhập lại!'),
	        	res.redirect('/backend/admin.html')
	        }
	      }

	    });
	});

	// app.get("/page", function(req,res){
		// myModel.paginate({}, 2, 10, function(error, pageCount, paginatedResults) {
		//   if (error) {
		//     console.error(error);
		//   } else {
		//     console.log('Pages:', pageCount);
		//     console.log(paginatedResults);
		//   }
		// })
	    
  	// });

		// SESSION
  	app.get('/taosession',function(req, res, next){
  		req.session.shop = "Cart";
  		res.send("Da tao roi!");
  	});
	app.get('/laysession',function(req, res, next){	
  		res.send("Session la" + req.session.shop);
  	});
  	app.get('/huysession',function(req, res, next){
  		req.session.destroy(function(err){
  			console.log(err);
  		});
  		res.send("Session da huy");
  	});


  	//Lay id san pham day vao session
  	app.get("/them-shop/:idsanpham",function(req,res,next){
  		var idsp = req.params.idsanpham;
  		if (!req.session.shop){
  			req.session.shop = [];
  		}
  		req.session.shop.push(idsp);
			// res.send("Session la" + req.session.shop);
			console.log("Trong session shop co " + req.session.shop);
		res.redirect('back');
	});
	//TAO Link API lay sp cho trang shop dua vao array id trong session ($in: array)
	app.get("/shop_product", function(req,res){
		// var i = req.session.shop.length;
		// console.log(i);
		// console.log(req.session.shop[0]);
		// console.log(req.session.shop[i-1]);
		collection.find({ id: { $in: req.session.shop } }).toArray(function (err,result) {
			if (err) {
				res.send({
					status: 0,
					message:'fail'
				});
			} else {
				if (result.length){
					// console.log(result);
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
	//Lay id san pham xoa khoi session
  	app.get("/xoa-shop/:idsanpham",function(req,res,next){
  		var idsp = req.params.idsanpham;
  		req.session.shop.pop(idsp);
			// res.send("Session la" + req.session.shop);
		console.log("da xoa khoi session id:  " + req.session.shop);
		res.redirect('back');
	});
	//Lay id san pham cho trang chi tiet
  	app.get("/chi-tiet/:idsanpham",function(req,res,next){
  		var idsp = req.params.idsanpham;
  		req.session.chi_tiet = [];
  		req.session.chi_tiet.push(idsp);
		// res.send("Session la" + req.session.shop);
		// console.log("da xoa khoi session id:  " + req.session.shop);
		res.redirect('/Detail.html');
	});
	//TAO Link API lay sp cho trang chi tiet dua vao trong session ($in: array)
	app.get("/chi_tiet_product", function(req,res){
		// var i = req.session.shop.length;
		// console.log(i);
		// console.log(req.session.shop[0]);
		// console.log(req.session.shop[i-1]);
		collection.find({ id: { $in: req.session.chi_tiet } }).toArray(function (err,result) {
			if (err) {
				res.send({
					status: 0,
					message:'fail'
				});
			} else {
				if (result.length){
					// console.log(result);
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

	//sua quantity
	// app.get("/update_all_quantity",function(req,res){
	//         collection.updateMany({}, {$set: {"quantity":"1"}}, function (err,res) {
	// 	        if (err) throw err;
	// 	        console.log('updated quantity');
	// 	    });
	// 	    res.redirect('/');
	//     });

	// app.post("/update_quantity",upload.single("image"),function(req,res){
	// 		var idcansua = req.body.id;
	//         var quantity = req.body.quantity;
	//         console.log(idcansua);
	//         console.log(quantity);
	     //    collection.updateOne({id:idcansua}, {$set: {quantity:quantity}}, function (err,res) {
		    //     if (err) throw err;
		    //     console.log('update success: ' + res.result.nModified + ' record');
		    // });
		    // res.redirect('/Project-caominhquan/shop.html');
	    // });





  }
});

