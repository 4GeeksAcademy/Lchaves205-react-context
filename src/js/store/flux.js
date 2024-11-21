const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            contacts: []
        },
        actions: {
            // Fetch contacts from the API
            getContacts: () => {
                fetch("https://playground.4geeks.com/contact/agendas/Lchaves")
                    .then((result) => result.json())
                    .then(data => setStore({ contacts: data.contacts }));
            },

            // Create a new contact
            createContact: async (newContact) => {
                console.log(newContact);
                
                try {
                    const response = await fetch(
                        'https://playground.4geeks.com/contact/agendas/Lchaves/contacts',
                        {
                            method: "POST",
                            headers: {
                                "Content-Type": "Application/json"
                            },
                            body: JSON.stringify(newContact)
                        }
                    );
                    if (!response.ok) {
                        throw new Error('Failed to update contact');
                    }
                } catch (error) {
                    console.error('Error updating contact:', error);
                }
            },

            // Update a contact via PUT request
            updateContactAPI: async (newContact) => {
                try {
                    const slug = 'your-slug-here';  
                    const contactId = 'new-contact-id';  
                    const response = await fetch(
                        `https://playground.4geeks.com/agendas/Lchaves/contacts/${contactId}`,
                        {
                            method: "PUT",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify(newContact)
                        }
                    );
                    if (!response.ok) {
                        throw new Error('Failed to update contact');
                    }
                    const updatedContact = await response.json();
                    console.log('Contact updated', updatedContact);
                } catch (error) {
                    console.error('Error updating contact:', error);
                }
            },

            // Delete a contact from the API and update the store
            deleteContact: async (contactId) => {
                try {
                    // Send DELETE request to API
                    const response = await fetch(
                        `https://playground.4geeks.com/contact/agendas/Lchaves/contacts/${contactId}`,
                        {
                            method: "DELETE"
                        }
                    );
                    if (!response.ok) {
                        throw new Error('Failed to delete contact');
                    }

                    // After successfully deleting, remove the contact from the store
                    const store = getStore();
                    const updatedContacts = store.contacts.filter(contact => contact.id !== contactId);
                    setStore({ contacts: updatedContacts });
                    console.log('Contact deleted successfully');
                } catch (error) {
                    console.error('Error deleting contact:', error);
                }
            },
        }
    };
};

export default getState;
