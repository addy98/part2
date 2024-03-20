const Contacts = ({ contacts, search, removeContact }) => {
    return (
        <ul>
            {contacts
            .filter(contact => 
            contact.name.toLowerCase().includes(search.toLowerCase()))
            .map(contact => 
            <li key={contact.id}>{contact.name} -- {contact.number} <button onClick={() => removeContact(contact)}>delete</button></li>)}
        </ul>
    )
}

export default Contacts