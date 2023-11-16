const express = require('express')
const app = express()
app.use(express.json())

app.listen(8000,() => {
    console.log('server is up')
})
 
var contacts=[
    {
        id:"1",
        name:"Sudarshan",
        bal:"2000"
    }
]

app.get('/contact',(_req ,res)=>{
    res.send({
        success:true,
        message:'Data send successfully',
        data:contacts
    })
})

app.post('/contact',(req,res) => {
    var name = req.body.name
    contacts.push({
        id:(contacts ).toString(),
        name: name
    })
    res.send({
        success:true,
        message:"data added successfully",
    })
})
contacts.push({
    id: "2",
    name: "Atharav",
    bal:"1000"
  });

  app.post('/send', (req, res) => {
    const senderId = req.body.senderId;
    const receiverId = req.body.receiverId;
    const amount = parseFloat(req.body.amount); 

    const sender = contacts.find(contact => contact.id === senderId);
    const receiver = contacts.find(contact => contact.id === receiverId);

    if (!sender || !receiver) {
        return res.status(404).send({
            success: false,
            message: 'Sender or receiver not found',
        });
    }

    if (sender.bal < amount) {
        return res.status(400).send({
            success: false,
            message: 'Insufficient balance',
        });
    }

    sender.bal -= amount;
    receiver.bal = (parseFloat(receiver.bal) + amount).toString();

    res.send({
        success: true,
        message: `Successfully transferred ${amount} from ${sender.name} to ${receiver.name}`,
    });
});


app.post('/add', (req, res) => {
    const { name, bal } = req.body; 

    const newContact = {
        id: (contacts.length + 1).toString(),
        name: name,
        bal: bal || "0"
    };

    contacts.push(newContact);

    res.send({
        success: true,
        message: 'Contact added successfully',
        data: newContact,
    });
});
app.get('/view/:id', (req, res) => {
    const contactId = req.params.id;

    const contact = contacts.find(contact => contact.id === contactId);

    if (!contact) {
        return res.status(404).send({
            success: false,
            message: 'Contact not found',
        });
    }

    res.send({
        success: true,
        message: 'Contact found',
        data: contact,
    });
});

app.get('/viewall', (_req, res) => {
    res.send({
        success: true,
        message: 'All contacts retrieved successfully',
        data: contacts,
    });
});


app.delete('/delete/:id', (req, res) => {
    const contactId = req.params.id;
    const initialContactsLength = contacts.length;

    contacts = contacts.find(contact => contact.id !== contactId);

    if (contacts.length === initialContactsLength) {
        return res.status(404).send({
            success: false,
            message: 'Contact not found',
        });
    }

    res.send({
        success: true,
        message: 'Contact deleted successfully',
    });
});
