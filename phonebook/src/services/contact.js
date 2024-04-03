import axios from "axios"

const contactsUrl = '/api/contacts'

const getContacts = () => axios.get(contactsUrl)

const createContact = (contact) => axios.post(contactsUrl, contact)

const deleteContact = (id) => axios.delete(`${contactsUrl}/${id}`)

const updateContact = (contactObject, contactId) => axios.put(`${contactsUrl}/${contactId}`, contactObject)

export default { contactsUrl, getContacts, createContact, deleteContact, updateContact }