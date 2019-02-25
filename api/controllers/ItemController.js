/**
 * ItemController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

    // action - allItems 
    allItems: async function (req, res) {

        var items = await Item.find();
        if (req.wantsJSON) {
            return res.json(items);
        } else {
            return res.view('item/allItems', { 'allItems': items });
        }
    },

    // action - detail
    detail: async function (req, res) {

        var message = Item.getInvalidIdMsg(req.params);

        if (message) return res.badRequest(message);

        var model = await Item.findOne(req.params.id);

        if (!model) return res.notFound();
        

        if (req.wantsJSON) {
            return res.json(model);
        } else {
            return res.view('item/detail', { 'detail': model });
        }

    },

    // action - update
    update: async function (req, res) {

        var message = Item.getInvalidIdMsg(req.params);

        if (message) return res.badRequest(message);

        if (req.method == "GET") {

            var model = await Item.findOne(req.params.id);

            if (!model) return res.notFound();

            return res.view('item/update', { 'item': model });

        } else {

            if (typeof req.body.Item === "undefined")
                return res.badRequest("Form-data not received.");

            var models = await Item.update(req.params.id).set({
                name: req.body.Item.name,
                category: req.body.Item.category,
                style: req.body.Item.style,
                image_URL: req.body.Item.image_URL,
                season: req.body.Item.season,
                remark: req.body.Item.remark,
                temperature: req.body.Item.temperature,
                wind: req.body.Item.wind,
                material: req.body.Item.material,
                color: req.body.Item.color,
            }).fetch();

            if (models.length == 0) return res.notFound();

            return res.ok("Record updated");

        }
    },

    // action - delete 
    delete: async function (req, res) {

        if (req.method == "GET") return res.forbidden();

        var message = Item.getInvalidIdMsg(req.params);

        if (message) return res.badRequest(message);

        var models = await Item.destroy(req.params.id).fetch();

        if (models.length == 0) return res.notFound();

        return res.ok("Item Deleted.");

    },

    populate: async function (req, res) {

        if (!['ownedBy'].includes(req.params.association)) return res.notFound();

        const message = sails.getInvalidIdMsg(req.params);

        if (message) return res.badRequest(message);

        var model = await Item.findOne(req.params.id).populate(req.params.association);

        if (!model) return res.notFound();

        return res.json(model);
    },

};

