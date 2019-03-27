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

  'GET /item/allItems': 'ItemController.allItems',
  'GET /outfit/allOutfits': 'OutfitController.allOutfits',
  'GET /size/allSizes': 'SizeController.allSizes',

  'POST /item/create': 'UserController.create',
  'POST /outfit/createOutfit': 'UserController.createOutfit',
  'POST /size/createSize': 'SizeController.create',

  'GET /item/update/:id': 'ItemController.update',
  'POST /item/update/:id': 'ItemController.update',
  'GET /outfit/updateOutfit/:id': 'OutfitController.update',
  'POST /outfit/updateOutfit/:id': 'OutfitController.update',
  'GET /user/updateProfile': 'UserController.updateProfile',
  'POST /user/updateProfile': 'UserController.updateProfile',

  'DELETE /item/:id': 'ItemController.delete',
  'DELETE /outfit/:id': 'OutfitController.delete',
  'DELETE /size/:id': 'SizeController.delete',

  'GET /item/itemCount': 'ItemController.itemCount',

  '/item/populate': { view: '404' },
  '/outfit/populate': { view: '404' },
  '/item/add': { view: '404' },
  '/item/remove': { view: '404' },

  '/item/:id/:association': 'ItemController.populate',
  '/outfit/:id/:association': 'OutfitController.populate',
  '/item/:id/:association/add/:fk': 'ItemController.add',
  '/item/:id/:association/remove/:fk': 'ItemController.remove',


  //  ╦ ╦╔═╗╔╗ ╦ ╦╔═╗╔═╗╦╔═╔═╗
  //  ║║║║╣ ╠╩╗╠═╣║ ║║ ║╠╩╗╚═╗
  //  ╚╩╝╚═╝╚═╝╩ ╩╚═╝╚═╝╩ ╩╚═╝


  //  ╔╦╗╦╔═╗╔═╗
  //  ║║║║╚═╗║
  //  ╩ ╩╩╚═╝╚═╝


};
