import httpRequestDetails from "./basicIrlAxios";
export function createActivityCard(card) {
  return httpRequestDetails.post("/api/tasks", card);
}
export function getAll() {
  return httpRequestDetails.get("/api/tasks");
}
export function deleteActivityCard(id) {
  return httpRequestDetails.delete(`/cards/delete-activity-cards/${id}`);
}
export function updateActivityCard(id, activityCard) {
  return httpRequestDetails.put(
    `/cards/edit-activity-cards/${id}`,
    activityCard
  );
}
export function updateActivityCardToPaidTrue(id, activityCard) {
  return httpRequestDetails.put(`/cards/payment/${id}`, activityCard,{
    method: 'PUT',
  
    body: JSON.stringify(activityCard),
  });
}
export function getSpecificActivityCard(id) {
  return httpRequestDetails.get(`/cards/my-activity-cards/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": localStorage.token,
      // Add other headers as needed
    },
  });
}
const acitivityCardServices = {
  createActivityCard,
  getAll,
  deleteActivityCard,
  updateActivityCard,
  getSpecificActivityCard,
};
export default acitivityCardServices;
