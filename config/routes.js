/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {


  //  ╦ ╦╔═╗╔╗ ╔═╗╔═╗╔═╗╔═╗╔═╗
  //  ║║║║╣ ╠╩╗╠═╝╠═╣║ ╦║╣ ╚═╗
  //  ╚╩╝╚═╝╚═╝╩  ╩ ╩╚═╝╚═╝╚═╝

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/': {
    //view: 'item/allItems'
    view: 'user/login'
  },

  /***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static assets.             *
  *                                                                          *
  ***************************************************************************/


  //  ╔═╗╔═╗╦  ╔═╗╔╗╔╔╦╗╔═╗╔═╗╦╔╗╔╔╦╗╔═╗
  //  ╠═╣╠═╝║  ║╣ ║║║ ║║╠═╝║ ║║║║║ ║ ╚═╗
  //  ╩ ╩╩  ╩  ╚═╝╝╚╝═╩╝╩  ╚═╝╩╝╚╝ ╩ ╚═╝

  'POST /user/signup': 'UserController.signup',

  'GET /user/myProfile': 'UserController.myProfile',

  'GET /item/detail/:id': 'ItemController.detail',
  'GET /outfit/detail/:id': 'OutfitController.detail',
  'GET /pkList/detail/:id': 'PkListController.detail',

  'GET /item/allItems': 'ItemController.allItems',
  'GET /outfit/allOutfits': 'OutfitController.allOutfits',
  'GET /size/allSizes': 'SizeController.allSizes',

  'GET /item/returnItems': 'ItemController.returnItems',
  'POST /item/returnItems': 'ItemController.returnItems',
  'GET /outfit/returnOutfit': 'OutfitController.returnOutfit',
  'POST /outfit/returnOutfit': 'OutfitController.returnOutfit',
  'GET /pkList/returnPkList': 'PkListController.returnPkList',
  'POST /pkList/returnPkList': 'PkListController.returnPkList',
  'POST /pkList/returnPkListById': 'PkListController.returnPkListById',
  

  'POST /item/create': 'UserController.create',
  'POST /outfit/createOutfit': 'UserController.createOutfit',
  'POST /size/createSize': 'SizeController.create',
  'POST /pkList/createList': 'PkListController.createList',

  'GET /item/update/:id': 'ItemController.update',
  'POST /item/update/:id': 'ItemController.update',
  'GET /outfit/updateOutfit/:id': 'OutfitController.update',
  'POST /outfit/updateOutfit/:id': 'OutfitController.update',
  'POST /pkList/updateList/:id': 'PkListController.updateList',

  'GET /user/updateProfile': 'UserController.updateProfile',
  'POST /user/updateProfile': 'UserController.updateProfile',
  

  'GET /item/setStatus/:id': 'ItemController.setStatus',
  'POST /item/setStatus/:id': 'ItemController.setStatus',

  'DELETE /item/:id': 'ItemController.delete',
  'DELETE /outfit/:id': 'OutfitController.delete',
  'DELETE /size/:id': 'SizeController.delete',
  'DELETE /pkList/:id': 'PkListController.delete',

  'GET /item/itemCount': 'ItemController.itemCount',
  'GET /item/categoryStat': 'ItemController.categoryStat',
  'GET /outfit/outfitCount': 'OutfitController.outfitCount',

  '/item/populate': { view: '404' },
  '/outfit/populate': { view: '404' },
  '/item/add': { view: '404' },
  '/item/remove': { view: '404' },

  '/item/:id/:association': 'ItemController.populate',
  '/outfit/:id/:association': 'OutfitController.populate',
  '/pkList/:id/:association': 'PkListController.populate',

  '/item/:id/:association/add/:fk': 'ItemController.add',
  '/item/:id/:association/remove/:fk': 'ItemController.remove',

  '/item/:id/:association/addToPkList/:fk': 'ItemController.addToPkList',

  '/pkList/:id/:association/add/:fk': 'PkListController.add',
  '/pkList/:id/:association/remove/:fk': 'PkListController.remove',
  


  //  ╦ ╦╔═╗╔╗ ╦ ╦╔═╗╔═╗╦╔═╔═╗
  //  ║║║║╣ ╠╩╗╠═╣║ ║║ ║╠╩╗╚═╗
  //  ╚╩╝╚═╝╚═╝╩ ╩╚═╝╚═╝╩ ╩╚═╝


  //  ╔╦╗╦╔═╗╔═╗
  //  ║║║║╚═╗║
  //  ╩ ╩╩╚═╝╚═╝


};
