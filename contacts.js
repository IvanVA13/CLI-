const fs = require('fs');
const path = require('path');

const contactsPath = path.normalize('./db/contacts.json');

function listContacts() {
  fs.readFile(contactsPath, (err, data) => {
    if (err) {
      console.log(err.message);
      return;
    } else {
      try {
        console.table(JSON.parse(data.toString()));
      } catch (err) {
        console.log(err.message);
      }
    }
  });
}

function getContactById(contactId) {
  fs.readFile(contactsPath, (err, data) => {
    if (err) {
      console.log(err.message);
      return;
    } else {
      try {
        const contacts = JSON.parse(data.toString());
        console.log(contacts.find(contact => contact.id === +contactId));
      } catch (err) {
        console.log(err.message);
      }
    }
  });
}

function removeContact(contactId) {
  fs.readFile(contactsPath, (err, data) => {
    if (err) {
      console.log(err.message);
      return;
    } else {
      const contacts = JSON.parse(data.toString());
      const deletingContact = contacts.find(
        contact => contact.id === +contactId,
      );
      if (deletingContact) {
        fs.writeFile(
          contactsPath,
          `${JSON.stringify(
            contacts.filter(contact => contact.id !== +contactId),
          )}`,
          err => {
            if (err) {
              console.log(err.message);
              return;
            }
          },
        );
      }
    }
  });
}

function addContact(name, email, phone) {
  fs.readFile(contactsPath, (err, data) => {
    if (err) {
      console.log(err.message);
      return;
    } else {
      const contacts = JSON.parse(data.toString());

      const idAddingContact =
        contacts.reduce((prev, cur) => (prev.id > cur.id ? prev.id : cur.id)) +
        1;
      const addingContact = {
        id: idAddingContact,
        name,
        email,
        phone,
      };
      const newArrContacts = [...contacts, addingContact];
      fs.writeFile(contactsPath, `${JSON.stringify(newArrContacts)}`, err => {
        if (err) {
          console.log(err.message);
          return;
        }
      });
    }
  });
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
