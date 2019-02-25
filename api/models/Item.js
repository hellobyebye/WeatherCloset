/**
 * Item.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝

    name: {
      type: "string",
      unique: true,
      required: true
    },

    category: {
      type: "string" //top, bottom, coat 
    },

    style: {
      type: "string" //formal, casual
    },

    season: {
      type: "string"//winter
    },

    remark: {
      type: "string"
    },

    image_URL: {
      type: "string"
    },

    temperature: {
      type: "number" //degree
    },

    wind: {
      type: "string"//strong, medium, weak
    },

    material: {
      type: "string" //cotton
    },

    color: {
      type: "string"//red
    },

    userId: {
      model: 'user',
      //required: true
    }


    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝

    
    // belongsTo: {
    //   collection: 'User',
    //   via: 'owns'
    // }

  },

  getInvalidIdMsg: function (opts) {

    if (typeof opts.id === "undefined" || isNaN(parseInt(opts.id)))
      return "Item not specified or with incorrect type.";

    return null;        // falsy

  },
};

