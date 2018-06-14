
module.exports.id = 'e415e43d.f10178';

const _ = require('lodash'),
  config = require('../config');

/**
 * @description flow e415e43d.f10178 update
 * @param done
 */
   

module.exports.up = function (done) {
  let coll = this.db.collection(`${_.get(config, 'nodered.mongo.collectionPrefix', '')}noderedstorages`);
  coll.update({"path":"e415e43d.f10178","type":"flows"}, {
    $set: {"path":"e415e43d.f10178","body":[{"id":"6b2f3912.a09f08","type":"http response","z":"e415e43d.f10178","name":"","statusCode":"","x":907.500019073486,"y":395.5000133514401,"wires":[]},{"id":"12413869.ddc528","type":"http in","z":"e415e43d.f10178","name":"tx","url":"/tx/:hash","method":"get","upload":false,"swaggerDoc":"","x":288.75,"y":395.5,"wires":[["92a80432.496758"]]},{"id":"b68ffffb.8e49e","type":"catch","z":"e415e43d.f10178","name":"","scope":null,"x":307,"y":585,"wires":[["49075d44.432d44","cf9070d6.5ab8d"]]},{"id":"5c2fd91f.e496a8","type":"http response","z":"e415e43d.f10178","name":"","statusCode":"","x":764,"y":586,"wires":[]},{"id":"49075d44.432d44","type":"function","z":"e415e43d.f10178","name":"transform","func":"\nlet factories = global.get(\"factories\"); \n\nmsg.payload = factories.messages.generic.fail;\n    \nreturn msg;","outputs":1,"noerr":0,"x":548,"y":585,"wires":[["5c2fd91f.e496a8"]]},{"id":"cf9070d6.5ab8d","type":"debug","z":"e415e43d.f10178","name":"","active":true,"console":"false","complete":"error","x":451,"y":539,"wires":[]},{"id":"cb93a20a.bb5d3","type":"http in","z":"e415e43d.f10178","name":"history","url":"/tx/:addr/history","method":"get","upload":false,"swaggerDoc":"","x":281,"y":237,"wires":[["e558bff.7e2784"]]},{"id":"e558bff.7e2784","type":"function","z":"e415e43d.f10178","name":"parse","func":"const prefix = global.get('settings.mongo.collectionPrefix');\nconst _ = global.get('_');\n\nmsg.address = msg.req.params.addr;\n\nmsg.payload ={ \n    model: `${prefix}TX`, \n    request: {\n      $or: [\n        {'sender': msg.address},\n        {'recipient': msg.address}\n      ]\n  },\n  options: {\n      sort: {timestamp: -1},\n      limit: parseInt(msg.req.query.limit) || 100,\n      skip: parseInt(msg.req.query.skip) || 0\n  }\n};\n\nreturn msg;","outputs":1,"noerr":0,"x":437.0000762939453,"y":237.00001335144043,"wires":[["45ab2beb.917bc4"]]},{"id":"45ab2beb.917bc4","type":"mongo","z":"e415e43d.f10178","model":"","request":"{}","options":"{}","name":"mongo","mode":"1","requestType":"0","dbAlias":"primary.data","x":603,"y":237,"wires":[["452c6d9e.f16384"]]},{"id":"ab0df8ed.00d388","type":"http response","z":"e415e43d.f10178","name":"","statusCode":"","x":909,"y":236,"wires":[]},{"id":"92a80432.496758","type":"async-function","z":"e415e43d.f10178","name":"requestTx","func":"const prefix = global.get('settings.mongo.collectionPrefix');\nconst _ = global.get('_');\n\nmsg.payload ={ \n    model: `${prefix}TX`, \n    request: {\n      hash: msg.req.params.hash\n  }\n};\n\nreturn msg;\n","outputs":1,"noerr":0,"x":476.9653205871582,"y":396.54168128967285,"wires":[["9352032c.01b68"]]},{"id":"9352032c.01b68","type":"mongo","z":"e415e43d.f10178","model":"","request":"{}","options":"{}","name":"mongo","mode":"1","requestType":"0","dbAlias":"primary.data","x":645.0173149108887,"y":396.7881832122803,"wires":[["e2a724dd.f42068"]]},{"id":"452c6d9e.f16384","type":"function","z":"e415e43d.f10178","name":"","func":"const _ = global.get('_');\n\nmsg.payload = _.map(msg.payload, tx => _.omit(\n    tx, ['_id', '__v']\n));\nreturn msg;","outputs":1,"noerr":0,"x":751.5278701782227,"y":237.11808395385742,"wires":[["ab0df8ed.00d388"]]},{"id":"e2a724dd.f42068","type":"function","z":"e415e43d.f10178","name":"","func":"const _ = global.get('_');\n\nmsg.payload = _.omit(\n    msg.payload[0], ['_id', '__v']\n);\nreturn msg;","outputs":1,"noerr":0,"x":779.3507080078125,"y":398.0104064941406,"wires":[["6b2f3912.a09f08"]]},{"id":"b6fd6057.701b3","type":"http in","z":"e415e43d.f10178","name":"send tx","url":"/tx/send","method":"post","upload":false,"swaggerDoc":"","x":293.0173645019531,"y":315.7881774902344,"wires":[["1ffd48b0.295f37"]]},{"id":"a16c085c.68b818","type":"http response","z":"e415e43d.f10178","name":"","statusCode":"","x":662.017333984375,"y":309.7881774902344,"wires":[]},{"id":"1ffd48b0.295f37","type":"async-function","z":"e415e43d.f10178","name":"requestTx","func":"const rest = global.get('settings.node');\nconst requests = global.get('settings.requests');\nconst apiKey = global.get('settings.apiKey');\n\n\nrequests.setNodeConfig(rest);\n\nconst tx = msg.payload.tx;\n\nmsg.payload = await requests.sendTransaction(apiKey, tx);\nreturn msg;","outputs":1,"noerr":1,"x":467.017333984375,"y":311.7881774902344,"wires":[["a16c085c.68b818","e8968d7e.6e7c4"]]},{"id":"e8968d7e.6e7c4","type":"debug","z":"e415e43d.f10178","name":"","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"false","x":560,"y":180,"wires":[]}]}
  }, {upsert: true}, done);
};

module.exports.down = function (done) {
  let coll = this.db.collection(`${_.get(config, 'nodered.mongo.collectionPrefix', '')}noderedstorages`);
  coll.remove({"path":"e415e43d.f10178","type":"flows"}, done);
};
