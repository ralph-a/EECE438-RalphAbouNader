const setEditModal = (id)=>{

    
    let name=document.getElementById("name-"+id.toString()).value;
    let profession=document.getElementById("prof-"+id.toString()).value;
    let mobile_number=document.getElementById("mnum-"+id.toString()).value;
    let telephone_number=document.getElementById("tnum-"+id.toString()).value;
   
    let data = {};

  

        data["id"]= id.toString();
        data["name"]= name;
        data["profession"]= profession;
        data["mobile_number"]= mobile_number;
        data["telephone_number"]= telephone_number;
        console.log(data);

    const xhttp = new XMLHttpRequest();
    xhttp.open("POST", "http://localhost:3000/contact/" + id.toString());
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(data));
    location.reload();
}

    const deletecontact = (id) => {
    
        const xhttp = new XMLHttpRequest();
        xhttp.open("DELETE", "http://localhost:3000/contact/" + id.toString(), false);
        xhttp.send();
        location.reload();
    
    }
    


function loadcontacts() {
    const xhttp = new XMLHttpRequest();

    xhttp.open("GET", "http://localhost:3000/contact", false);
    xhttp.send();

    const contacts = JSON.parse(xhttp.responseText);
console.log(contacts);
    for (let contact of contacts) {
        let id  = contact.id.toString();    
        let x = `
            <div class="col-4">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">${contact.name}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">${contact.id}</h6>

                        <div>Profession: ${contact.profession}</div>
                        <div>Mobile Number: ${contact.mobile_number}</div>
                        <div>Telephone number: ${contact.telephone_number}</div>

                        <hr>
                        


                        <button type = "button" onclick = "deletecontact(${contact.id})" >Delete</button>
                        <button types="button" data-toggle="modal" data-target="#modifications-${contact.id}">
                            Edit
                        </button>
                        <div class="modal fade"
        id="modifications-${contact.id}" role="dialog">
        <div class="modal-dialog">
 
            <!-- Modal content-->
            <div class="modal-content">
                <div class="modal-header">
 
                    <h1 class="modal-title">
                        Edit Contact Information
                    </h1>
                </div>
 
                <div class="modal-body">
                     
                     
<p>
   

                <label for="name">Name:</label>         
                <input type="text" id="name-${contact.id}" name="name" value="${contact.name}"><br>
                <label for="prof">Profession:</label>
                <input type="text" id="prof-${contact.id}" name="prof" value="${contact.profession}"><br>
                <label for="mnum">Mobile Number:</label>
                <input type="text" id="mnum-${contact.id}" name="mnum" value="${contact.mobile_number}"><br>
                <label for="tnum">Telephone Number:</label>
                <input type="text" id="tnum-${contact.id}" name="tnum" value="${contact.telephone_number}"><br>


                    </p>
 
 
                </div>
 
                <div class="modal-footer">
                    <button type="button"
                        class="btn btn-primary"
                        onClick="setEditModal(${contact.id})">
                        Modify
                    </button>
                     
                    <button type="button"
                        class="btn btn-default"
                        data-dismiss="modal"
                        >
                        Close
                    </button>
                </div>
            </div>
        
               
            </div>
        `;

        document.getElementById('contacts').innerHTML = document.getElementById('contacts').innerHTML + x;
    }
}

loadcontacts();