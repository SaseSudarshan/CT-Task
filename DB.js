    const express = require('express');
    const mongoose = require('mongoose');
    
    const app = express();
    app.use(express.json());
    
    // Connect to MongoDB
    mongoose.connect('mongodb://localhost:27017/contactApp', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'MongoDB connection error:'));
    db.once('open', () => {
      console.log('Connected to MongoDB');
    });
    
    //  Contact schema
    const contactSchema = new mongoose.Schema({
      name: String,
      bal: Number,
    });
    
    const Contact = mongoose.model('Contact', contactSchema);
    
    // view all contacts
    app.get('/viewall', async (_req, res) => {
      try {
        const contacts = await Contact.find();
        res.send({
          success: true,
          message: 'All contacts retrieved successfully',
          data: contacts,
        });
      } catch (error) {
        res.status(500).send({
          success: false,
          message: 'Error retrieving contacts',
          error: error.message,
        });
      }
    });
    
    // add a contact
    app.post('/add', async (req, res) => {
      const { name, bal } = req.body;
    
      try {
        const newContact = await Contact.create({ name, bal: parseFloat(bal) || 0 });
        res.send({
          success: true,
          message: 'Contact added successfully',
          data: newContact,
        });
      } catch (error) {
        res.status(500).send({
          success: false,
          message: 'Error adding contact',
          error: error.message,
        });
      }
    });
    
    // DELETE a contact
    app.delete('/delete/:id', async (req, res) => {
      const contactId = req.params.id;
    
      try {
        const deletedContact = await Contact.findByIdAndDelete(contactId);
        if (!deletedContact) {
          return res.status(404).send({
            success: false,
            message: 'Contact not found',
          });
        }
        res.send({
          success: true,
          message: 'Contact deleted successfully',
          data: deletedContact,
        });
      } catch (error) {
        res.status(500).send({
          success: false,
          message: 'Error deleting contact',
          error: error.message,
        });
      }
    });
    
  
    const PORT = 8000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
    }
});


const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

