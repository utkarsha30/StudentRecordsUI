const url = 'https://gist.githubusercontent.com/harsh3195/b441881e0020817b84e34d27ba448418/raw/c4fde6f42310987a54ae1bc3d9b8bfbafac15617/demo-json-data.json';
const div = document.getElementById('table-container');
const err = document.getElementById("error");
err.style.display = 'none';
let allData = []
const loadData = async()=>{
try{
    const response = await fetch(url);
    if(!response.ok){
       err.innerHTML = "Database not found"
       err.style.display = 'block';
    }
    allData = await response.json();
    renderTable(allData);
}
catch(error){
    err.innerHTML = error;
    err.style.display = 'block';
    
}
}

const  renderTable=(data)=> {
    let tableBody = `<table border=1>`;
    tableBody += `
    <thead>
        <tr>
            <td>ID</td>
            <td>Name</td>
            <td>Gender</td>
            <td>Class</td>
            <td>Marks</th>
            <td>Passing</td>
            <td>Email</td>
        </tr>
    </thead>
    <tbody>
    `;

    data.forEach(std => {
        tableBody += `
        <tr>
            <td>${std.id}</td>
            <td >
            <div class="name-container">
                <img src="${std.img_src}" width="30" height="30" alt="Student Image">
                <span>${std.first_name} ${std.last_name}</span>
                </div>
            </td>
            <td>${std.gender}</td>
            <td>${std.class}</td>
            <td>${std.marks}</td>
            <td>${std.passing ? 'Passing' : 'Failed'}</td>
            <td>${std.email}</td>
        </tr>
        `;
    });

    tableBody += `</tbody></table>`;
    div.innerHTML = tableBody;
}
const sortData = (criteria) => {
    let sortedData = [...allData];

    switch (criteria) {
        case 'A-Z':
            sortedData.sort((a, b) => a.first_name.localeCompare(b.first_name));
            break;
        case 'Z-A':
            sortedData.sort((a, b) => b.first_name.localeCompare(a.first_name));
            break;
        case 'Marks':
            sortedData.sort((a, b) => b.marks - a.marks);
            break;
        case 'Passing':
            sortedData.sort((a, b) => (a.passing === b.passing) ? 0 : (a.passing ? -1 : 1));
            break;
        case 'Class':
            sortedData.sort((a, b) => a.class-b.class);
            break;
        case 'Gender':
            sortedData.sort((a, b) => a.gender.localeCompare(b.gender));
            break;
        default:
            break;
    }

    renderTable(sortedData);
};
const filterData = ()=>{
    const searchQuery = document.getElementById('search').value.toLowerCase(); 
    const filteredData = allData.filter(
        student=>{
            const fullName = `${student.first_name} ${student.last_name}`.toLowerCase();
        const email = student.email.toLowerCase();
        return fullName.includes(searchQuery) || email.includes(searchQuery);
        }
    );
    renderTable(filteredData);
}
loadData();