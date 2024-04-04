import { useState, useEffect } from 'react'
import NewContactForm from './components/NewContactForm'
import Search from './components/Search'
import Contacts from './components/Contacts'
import Notification from './components/Notification'
import contactsService from './services/contact'

const App = () => {

  const [contacts, setContacts] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')
  const [notification, setNotification] = useState({ message: null, type: '' })

  useEffect(() => {
    contactsService
      .getContacts()
      .then(response => {
        setContacts(response.data)
      })
  }, [])

  // input field/state change handlers
  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleSearchChange = (event) => setSearch(event.target.value)

  const addContact = (event) => {
    event.preventDefault()

    const contactObject = {
      name: newName,
      number: newNumber
    }

    if (contacts.filter(contact => contact.name === contactObject.name).length !== 0) {
      window.confirm(`${contactObject.name} is already in the phonebook, replace old number with new one?`)
      const contactId = contacts.find(contact => contact.name === contactObject.name).id
      contactsService
        .updateContact(contactObject, contactId)
        .then(response => {
          setContacts(contacts.filter(contact => contact.name !== contactObject.name).concat(response.data))
          setNewName('')
          setNewNumber('')
          setNotification({ message: `${contactObject.name}'s phone number was updated`, type: 'update' })
          setTimeout(() => {
            setNotification({ message: null, type: '' })
          }, 5000)
        })
        .catch(error => 
          setNotification({ message: `${contactObject.name} has already been removed from the server`, type: 'remove' }),
          setTimeout(() => {
            setNotification({ message: null, type: '' })
          }, 5000))
    } else {
      contactsService
        .createContact(contactObject)
        .then(response => {
          setContacts(contacts.concat(response.data))
          setNewName('')
          setNewNumber('')
          setNotification({ message: `${contactObject.name} was added to phonebook`, type: 'create' })
          setTimeout(() => {
            setNotification({ message: null, type: '' })
          }, 5000)
        })
        .catch(error => console.log('failed to create'))
    }
  }

  const removeContact = (contact) => {
    window.confirm(`Delete ${contact.name}?`)
    contactsService
      .deleteContact(contact.id)
      .then(response => {
        setContacts(contacts.filter(contact => contact.id !== response.data.id))
        setNotification({ message: `${contact.name} removed from phonebook`, type: 'remove' })
        setTimeout(() => {
          setNotification({ message: null, type: '' })
        }, 5000)
      })
      .catch(error => console.log(`failed to delete: error: ${error}`))
  }

  return (
    <div>
      <h2>Phonebook</h2>
      {notification.message != null && 
        <Notification message={notification.message} type={notification.type} />
      }
      <Search 
      search={search} 
      handleSearchChange={handleSearchChange} />
      
      <h2>Add a contact</h2>
      <NewContactForm 
      addContact={addContact} 
      newName={newName} 
      newNumber={newNumber} 
      handleNameChange={handleNameChange} 
      handleNumberChange={handleNumberChange} />
      
      <h2>Numbers</h2>
      <Contacts
      contacts={contacts}
      search={search}
      removeContact={removeContact} />
    </div>
  )
}

export default App