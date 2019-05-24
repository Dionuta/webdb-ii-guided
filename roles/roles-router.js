const knex = require('knex');

const router = require('express').Router();

const config = {
  client: 'sqlite3',
    connection: {
        filename: './data/rolex.db3'
    },
  useNullAsDefault: true
}

const db = knex(config);

function find() {
  return db('roles')
}

function findById(id) {
  return db('roles').where({id});
}

function add(user) {
  return db('roles').insert(user)
}

function update(id, role) {
  return db('roles')
    .where('id', Number(id))
    .update(role);
}

function remove(id) {
  return db('roles')
  .where('id', Number(id))
  .del()
}

router.get('/', async (req, res) => {
  try{
    const roles = await find(req.params);
    res.status(200).json(roles)
  } catch (err) {
    res.status(500).json(err)
  }
});

router.get("/:id", async (req, res) => {
  try {
    const role = await findById(req.params.id);
    if (role) {
      res.status(200).json(role);
    } else {
      res
        .status(404) 
        .json({ message: "The role with the specified ID does not exist." });
    }
  } catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: "The posts information could not be retrieved"
    });
  }
});

router.post('/', async (req, res) => {
   try{
     const newRole = await add(req.body)
     res.status(201).json(newRole)
   } catch (err) {
    res.status(500).json(err)
  }
});

router.put('/:id', async (req, res) => {
   try{
     const updatedRole = await update(req.params.id, req.body)
     res.status(200).json(updatedRole)
   } catch (err) {
    res.status(500).json(err)
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const count =   await remove(req.params.id);
    if(count > 0){
        res.status(200).json({ message: "The role has been removed" });
    }else{
        res.status(404).json({ message: "The role could not be found" });
    }
}catch (err) {
    res.status(500).json({ err });
  }
});

module.exports = router;
