/**
 * PkListController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

    // action - all packing lists
    allLists: async function (req, res) {

        const qUserid = req.session.userid;

        var model = await PkList.find({
            where: {
                userId: qUserid,
            },
            sort: 'createdAt DESC'
        });

        return res.json(model);

    },

    //create new packing list
    createList: async function (req, res) {

        if (req.method == "GET")
            return res.view('list/createList');

        if (typeof req.body.pkList === "undefined")
            return res.badRequest("Form-data not received.");

        if (!await PkList.find({ where: { userId: req.session.userid } })) return res.send("List not found");
        //var user = await User.find({ where: { userId: req.session.userid } });

        console.log("res: " + req.body.pkList);
        if (!req.body.pkList) return res.send("pkList not find");;

        var pkList = req.body.pkList;
        pkList.userId = req.session.userid;
        console.log("session userid: " + req.session.userid);
        console.log("pkList.userId: " + pkList.userId);

        await PkList.create(pkList);

        if (req.wantsJSON) {
            return res.json(pkList);
        } else {
            return res.ok("Successfully created!");
        }
    },

    // update the list info (not items)
    updateList: async function (req, res) {

        var message = PkList.getInvalidIdMsg(req.params);

        if (message) return res.badRequest(message);

        if (typeof req.body.pkList === "undefined")
            return res.badRequest("Form-data not received.");

        var models = await PkList.update(req.params.id).set({
            listName: req.body.pkList.listName,
            destination: req.body.pkList.destination,
            remark: req.body.pkList.remark,
        }).fetch();

        if (models.length == 0) return res.notFound();

        return res.ok("Record updated");

    },

    //add item to packing list
    add: async function (req, res) {

        if (!await PkList.findOne(req.params.id)) return res.notFound();

        if (!await Item.findOne(parseInt(req.params.fk))) return res.notFound();

        await PkList.addToCollection(req.params.id, 'hasItem').members(req.params.fk);

        console.log("add to pkList okk")
        return res.ok('Operation completed.');

    },

    //remove item from packing list
    remove: async function (req, res) {

        const message = sails.getInvalidIdMsg(req.params);

        if (message) return res.badRequest(message);

        if (!await PkList.findOne(req.params.id)) return res.notFound();

        if (!await Item.findOne(parseInt(req.params.fk))) return res.notFound();

        await PkList.removeFromCollection(req.params.id, 'hasItem').members(req.params.fk);

        console.log("remove item from pkList okk")
        return res.ok('Operation completed.');

    },

    // return pkList 
    returnPkList: async function (req, res) {

        const bUserid = req.session.userid;
        const bListName = req.body.listName;

        console.log("bListName: " + bListName)

        var model = await PkList.find({ where: { listName: bListName } });//userId: bUserid,

        console.log("model: " + JSON.stringify(model))
        return res.json(model);
    },


    // action - detail
    detail: async function (req, res) {

        var message = PkList.getInvalidIdMsg(req.params);

        if (message) return res.badRequest(message);

        var model = await PkList.findOne(req.params.id);

        if (!model) return res.notFound();

        return res.json(model);

    },


    populate: async function (req, res) {

        if (!['hasItem'].includes(req.params.association)) return res.notFound();

        const message = sails.getInvalidIdMsg(req.params);

        if (message) return res.badRequest(message);

        var model = await PkList.findOne(req.params.id).populate(req.params.association);

        if (!model) return res.notFound();

        console.log("pkList populate: " + JSON.stringify(model));
        return res.json(model);
    },

    // action - delete 
    delete: async function (req, res) {

        if (req.method == "GET") return res.forbidden();

        var message = PkList.getInvalidIdMsg(req.params);

        if (message) return res.badRequest(message);

        var models = await PkList.destroy(req.params.id).fetch();

        if (models.length == 0) return res.notFound();

        return res.ok("PkList Deleted.");

    },

};

