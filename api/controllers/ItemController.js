/**
 * ItemController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

    // action - allItems 
    allItems: async function (req, res) {

        const qName = req.query.name || "";
        const qStyle = req.query.style || "";
        const qCategory = req.query.category || "";
        const qSeason = req.query.season || "";

        const qUserid = req.session.userid;
        
        console.log("session: " + JSON.stringify(req.session));

        console.log("qUserid: " + qUserid);

        var filtereditem = await Item.find({
            where: {
                name: {
                    contains: qName,
                },
                style: {
                    contains: qStyle,
                },
                category: {
                    contains: qCategory,
                },
                season: {
                    contains: qSeason,
                },
                userId: qUserid,
            },
            sort: 'createdAt DESC'
        });
        //console.log(filtereditem);

        if (req.wantsJSON) {
            if (req.body != undefined) {
                //console.log("req.body exist: " + JSON.stringify(req.body));
                const bName = req.body.name || "";
                const bStyle = req.body.style || "";
                const bCategory = req.body.category || "";
                const bSeason = req.body.season || "";
                const bUserid = req.session.userid;
                var model = await Item.find({
                    where: {
                        name: {
                            contains: bName,
                        },
                        style: {
                            contains: bStyle,
                        },
                        category: {
                            contains: bCategory,
                        },
                        season: {
                            contains: bSeason,
                        },
                        userId: bUserid,
                    },
                    sort: 'createdAt DESC'
                });
            } else {
                var model = await Item.find({ where: { userId: qUserid } });
            }
        }
        if (req.wantsJSON) {
            return res.json(model);
        } else {
            return res.view('item/allItems', { 'filteredItem': filtereditem });
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

    // // action - create
    // create: async function (req, res) {

    //     if (req.method == "GET")
    //         return res.view('item/create');

    //     if (typeof req.body.Event === "undefined")
    //         return res.badRequest("Form-data not received.");

    //     await Item.create(req.body.Item);

    //     return res.ok("Successfully created!");
    // },

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

