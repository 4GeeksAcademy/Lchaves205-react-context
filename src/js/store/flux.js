const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            contacts: []
        },
        actions: {
			getContacts: () => {
                fetch("https://playground.4geeks.com/contact/agendas/Lchaves")
                    .then((result) => result.json())
                    .then(data => setStore({ contacts: data.contacts }))
			},
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
        }
    };
};

export default getState;
