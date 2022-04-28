/*const createResourceElement = (data) => {
  const $div = $('<div>');
  const $url = $('<p>').text(data.url);
  const $title = $('<p>').text(data.title);
  const $description = $('<p>').text(data.description);
  const $category = $('<p>').text(data.category);
  const $date = $('<p>').text(data.created_at);

  $div.append($url, $title, $description, $category, $date);

  const $resource = $('<article class="resource">');

  $resource.append($div);

  return $resource;

}

const renderResources = (data) => {
  const $resourceComponent = $('#resource-container');

  for (const resource of data) {
    const $resource = createResourceElement(resource);
    $resourceComponent.append($resource);
  }
}
*/
const createResourceItem = function (resource) {
  //return $("<li>").text(`${resource.url} - ${resource.title} - ${resource.description} - ${resource.created_at}`);
  const img = `http://api.pagepeeker.com/v2/thumbs.php?size=m&code={code}&refresh={refresh}&wait={wait}&url=${resource.url}`;
  const $resourceCard = $(`<div class="card" style="width: 18rem;">
  <img class="card-img-top" src="${img}" alt="Card image cap">
  <div class="card-body">
    <h5 class="card-title">${resource.title}</h5>
    <p class="card-text">${resource.description}</p>
    <a href="${resource.url}" class="btn btn-primary">${resource.title}</a>
  </div>
</div>`);

  return $resourceCard;
};


$(document).ready(() => {
  const $container = $("#resource-container");
    $.ajax({
    url: "/api/resources",
    method: "GET",
    dataType: "json",
    success: (data) => {
      const resourceElements = data.resources.map(createResourceItem);
      $container.append(resourceElements);
    },
    error: (xhr, status, errorMessage) => {
      console.log("error recieved", status, errorMessage);
    },
  });

});
