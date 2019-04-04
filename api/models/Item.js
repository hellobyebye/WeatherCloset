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
      unique: true,   //name is the primary key
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
      //type: "ref"
    },

    temperature: {
      type: "number", //degree
      allowNull: true,
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

    status: {
      type: "boolean"//true: item is available
    },

    userId: {
      model: 'user', //must have
      //required: true
    },

    // outfitId: {
    //   model: 'outfit', //can be null
    // },



    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝

    in: {
      collection: 'Outfit',
      via: 'contains'
    },

    inPkList: {
      collection: 'Pklist',
      via: 'hasItem'
    },

  },

  getInvalidIdMsg: function (opts) {

    if (typeof opts.id === "undefined" || isNaN(parseInt(opts.id)))
      return "Item not specified or with incorrect type.";

    return null;        // falsy

  },
};

