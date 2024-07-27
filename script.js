const url = 'https://gist.githubusercontent.com/harsh3195/b441881e0020817b84e34d27ba448418/raw/c4fde6f42310987a54ae1bc3d9b8bfbafac15617/demo-json-data.json';
const div = document.getElementById('table-container');

fetch(url)
    .then(response => response.json())
    .then(data => {
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