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
  return $("<li>").text(`${resource.url} - ${resource.title} - ${resource.description} - ${resource.created_at}`);
};

$(document).ready(() => {
  const container = $("#resource-container");
    $.ajax({
    url: "/api/resources",
    method: "GET",
    dataType: "json",
    success: (data) => {
      const resourceElements = data.resources.map(createResourceItem);
      container.append(resourceElements);
    },
    error: (xhr, status, errorMessage) => {
      console.log("error recieved", status, errorMessage);
    },
  });

});
