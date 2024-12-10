const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            contacts: []
        },
        actions: {
           
            getContacts: async () => {
                const agendaSlug = "Lchaves"; 

                try {
                   
                    const response = await fetch(`https://playground.4geeks.com/contact/agendas/${agendaSlug}`);
                    
                    if (response.status === 404) {
                      
                        console.log(`Agenda '${agendaSlug}' not found. Creating a new agenda.`);
                        
                        const createResponse = await fetch(`https://playground.4geeks.com/contact/agendas/${agendaSlug}`, {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({
                                name: "Default Agenda Name" 
                            }),
                        });

                        if (!createResponse.ok) {
                            throw new Error("Failed to create agenda");
                        }

                        console.log("Agenda created successfully");
                    } else if (!response.ok) {
                        throw new Error("Failed to fetch contacts");
                    }

                    
                    const data = await response.json();
                    setStore({ contacts: data.contacts || [] });

                } catch (error) {
                    console.error("Error fetching or creating agenda:", error);
                }
            },

           
            createContact: async (newContact) => {
                try {
                    const response = await fetch(
                        'https://playground.4geeks.com/contact/agendas/Lchaves/contacts',
                        {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify(newContact)
                        }
                    );
                    if (!response.ok) {
                        throw new Error("Failed to create contact");
                    }
                    console.log("Contact created successfully");
                } catch (error) {
                    console.error("Error creating contact:", error);
                }
            },

          
            updateContactAPI: async (contactId, updatedContact) => {
                try {
                    const response = await fetch(
                        `https://playground.4geeks.com/contact/agendas/Lchaves/contacts/${contactId}`,
                        {
                            method: "PUT",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify(updatedContact),
                        }
                    );
                    if (!response.ok) {
                        throw new Error("Failed to update contact");
                    }
                    console.log("Contact updated successfully");
                } catch (error) {
                    console.error("Error updating contact:", error);
                }
            },
            
            deleteContact: async (contactId) => {
                try {
                    const response = await fetch(
                        `https://playground.4geeks.com/contact/agendas/Lchaves/contacts/${contactId}`,
                        { method: "DELETE" }
                    );
                    if (!response.ok) {
                        throw new Error("Failed to delete contact");
                    }

                    const store = getStore();
                    const updatedContacts = store.contacts.filter((contact) => contact.id !== contactId);
                    setStore({ contacts: updatedContacts });
                    console.log("Contact deleted successfully");
                } catch (error) {
                    console.error("Error deleting contact:", error);
                }
            },
        }
    };
};

export default getState;
