var schools = {
  getAll: (req, res) => {
    var allSchools = data; // Spoof a DB call
    res.json(allSchools);
  },

  getOne: (req, res) => {
    var id = req.params.id;
    var school = data[0];
    res.json(school);
  },

  create: (req, res) => {
    var newSchool = req.body;
    data.push(newSchool); // Spoof a DB call
    res.json(newSchool);
  },

  update: (req, res) => {
    var updateSchool = req.body;
    var id = req.params.id;
    data[id] = updateSchool; // Spoof a DB call
    res.json(updateSchool);
  },

  delete: (req, res) => {
    var id = req.params.id;
    data.splice(id, 1);
    res.json(true);
  }
};

var data = [{
  name: 'school 1',
  id: '1'
}, {
  name: 'school 2',
  id: '2'
}, {
  name: 'school 3',
  id: '3'
}];

module.exports = schools;
