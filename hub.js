document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.sidebar button').forEach(button => {
        button.addEventListener('click', () => {
            document.querySelector('.sidebar button.active').classList.remove('active');
            button.classList.add('active');
            document.querySelector('.content-section.active').classList.remove('active');
            document.getElementById(button.dataset.section).classList.add('active');
        });
    });

    let resources = JSON.parse(localStorage.getItem('resources')) || [];
    let suppliers = JSON.parse(localStorage.getItem('suppliers')) || [];

    const modal = document.getElementById('resourceModal');
    const span = document.querySelector('.close');
    
    document.getElementById('newResourceBtn').onclick = () => modal.style.display = 'flex';
    span.onclick = () => modal.style.display = 'none';
    window.onclick = (e) => e.target == modal && (modal.style.display = 'none');

    document.getElementById('resourceForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const newResource = {
            type: document.getElementById('resourceType').value,
            title: document.getElementById('resourceTitle').value,
            content: document.getElementById('resourceContent').value,
            tags: document.getElementById('resourceTags').value.split(',').map(t => t.trim()),
            date: new Date().toLocaleString()
        };
        
        resources.push(newResource);
        localStorage.setItem('resources', JSON.stringify(resources));
        modal.style.display = 'none';
        renderResources();
    });

    document.getElementById('supplierForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const newSupplier = {
            name: document.getElementById('supplierName').value,
            phone: document.getElementById('supplierPhone').value,
            schedule: document.getElementById('supplierSchedule').value,
            location: document.getElementById('supplierLocation').value
        };
        
        suppliers.push(newSupplier);
        localStorage.setItem('suppliers', JSON.stringify(suppliers));
        renderSuppliers();
        e.target.reset();
    });

    function renderResources() {
        const grid = document.getElementById('resourcesGrid');
        grid.innerHTML = resources.map(res => `
            <div class="card">
                <h3>${res.title}</h3>
                ${res.type === 'image' ? `<img src="${res.content}" alt="${res.title}">` : 
                 res.type === 'link' ? `<a href="${res.content}" target="_blank">${res.content}</a>` :
                 res.type === 'password' ? `<input type="password" value="${res.content}" readonly>` : 
                 `<p>${res.content}</p>`}
                <div class="tags">${res.tags.map(t => `<span>#${t}</span>`).join(' ')}</div>
            </div>
        `).join('');
    }

    function renderSuppliers() {
        const list = document.getElementById('suppliersList');
        list.innerHTML = suppliers.map(sup => `
            <div class="supplier-item">
                <div>
                    <h4>${sup.name}</h4>
                    <p>📞 ${sup.phone}</p>
                    <p>⏰ ${sup.schedule}</p>
                    ${sup.location ? `<a href="${sup.location}" target="_blank">Ver ubicación</a>` : ''}
                </div>
            </div>
        `).join('');
    }

    renderResources();
    renderSuppliers();
});
