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

    //add item to packing list
    add: async function (req, res) {

        if (!await PkList.findOne(req.params.id)) return res.notFound();

        if (!await Item.findOne(parseInt(req.params.fk))) return res.notFound();

        await PkList.addToCollection(req.params.id, 'hasItem').members(req.params.fk);

        return res.ok('Operation completed.');

    },

};

