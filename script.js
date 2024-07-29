const url = 'https://gist.githubusercontent.com/harsh3195/b441881e0020817b84e34d27ba448418/raw/c4fde6f42310987a54ae1bc3d9b8bfbafac15617/demo-json-data.json';
const div = document.getElementById('table-container');
let allData = []
fetch(url)
    .then(response => response.json())
    .then(data => {
        allData = data;
        renderTable(data);
    })
    .catch(error => {
        console.error('Error fetching or processing data:', error);
        div.innerHTML = '<p>Error loading data.</p>';
    });

function renderTable(data) {
    let htmlContent = '<table border="1">';
    htmlContent += '<tr><th>ID</th><th>Name</th><th>Gender</th><th>Class</th><th>Marks</th><th>Passing</th><th>Email</th></tr>';

    data.forEach((student, index) => {
        const fullName = `${student.first_name} ${student.last_name}`;
        const passingStatus = student.passing ? 'Passing' : 'Failed';
        htmlContent += `
            <tr>
                <td>${index + 1}</td>
                <td class="student-info"><img src="${student.img_src}" alt="${fullName}" width="30" height="30"><span>${fullName}</span></td>
                <td>${student.gender}</td>
                <td>${student.class}</td>
                <td>${student.marks}</td>
                <td>${passingStatus}</td>
                <td>${student.email}</td>
            </tr>
        `;
    });

    htmlContent += '</table>';
    div.innerHTML = htmlContent;
}
function filterData() {
    const searchQuery = document.getElementById('search').value.toLowerCase(); 
    const filteredData = allData.filter(student => {
        const fullName = `${student.first_name} ${student.last_name}`.toLowerCase();
        const email = student.email.toLowerCase();
        return fullName.includes(searchQuery) || email.includes(searchQuery);
    });
    
    renderTable(filteredData);
}
function sortData (criteria){
    let sortedData = [...allData];
    if(criteria === 'A-Z'){
        sortedData.sort((a, b) => a.first_name.localeCompare(b.first_name));
    }
    else if (criteria === 'Z-A') {
        sortedData.sort((a, b) => b.first_name.localeCompare(a.first_name));
    }
    else if (criteria === 'Marks') {
        sortedData.sort((a, b) => b.marks-a.marks);
    }
    else if (criteria === 'Passing') {
        sortedData.sort((a, b) => b.passing-a.passing);
    }
    else if (criteria === 'Class') {
        sortedData.sort((a, b) => a.class-b.class);
    }
    else if (criteria === 'Gender') {
        sortedData.sort((a, b) => a.gender.localeCompare(b.gender));
    }
    renderTable(sortedData);

}