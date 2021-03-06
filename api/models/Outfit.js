/**
 * Outfit.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝

    oName: {
      type: "string",
      unique: true,
      required: true
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

    userId: {
      model: 'user',  //must have
      //required: true
    },

    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝

    contains: {
      collection: 'Item',
      via: 'in'
    },

    inPkList: {
      collection: 'Pklist',
      via: 'hasOutfit'
    },

  },

  getInvalidIdMsg: function (opts) {

    if (typeof opts.id === "undefined" || isNaN(parseInt(opts.id)))
      return "Outfit not specified or with incorrect type.";

    return null;        // falsy

  },
};

