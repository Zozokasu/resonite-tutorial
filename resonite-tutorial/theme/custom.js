(function () {
    var h2 = document.querySelectorAll('h2')
    var newList = document.createElement('ul');
    newList.setAttribute('class', 'innerLink');
    for (var i = 0, l = h2.length; i < l; i += 1) {
        var a = h2[i].firstElementChild;
        var label = a.innerText;
        var href = a.getAttribute('href');
        var newAnchor = document.createElement('a');
        newAnchor.setAttribute('href', href);
        newAnchor.innerHTML = label;
        var newItem = document.createElement('li');
        newItem.className = 'chapter-item expanded';
        newItem.appendChild(newAnchor);
        newList.appendChild(newItem);
    }
    document.querySelector('.sidebar .active').appendChild(newList);
})();