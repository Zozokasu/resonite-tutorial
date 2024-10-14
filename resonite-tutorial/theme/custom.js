(function () {
    var h2 = document.querySelectorAll("h2");
    var newList = document.createElement('ul');
    newList.setAttribute('class', 'innerLink');
    h2.forEach(function (item) {
        var a = item.firstElementChild;
        var label = a.innerText;
        var href = a.getAttribute('href');
        var newAnchor = document.createElement('a');
        newAnchor.setAttribute('href', href);
        newAnchor.innerHTML = label;
        var newItem = document.createElement('li');
        newItem.appendChild(newAnchor);
        newList.appendChild
    });
    document.querySelector('.sidebar .active').appendChild(newList);
})();