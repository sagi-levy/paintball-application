import httpRequestDetails from "./basicIrlAxios";
export function createActivityCard(card) {
  return httpRequestDetails.post("/cards/create-activity-card", card);
}
export function getAll() {
  return httpRequestDetails.get("/cards/my-activity-cards");
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
export function getSpecificActivityCard(id) {
  return httpRequestDetails.get(`/cards/my-activity-cards/${id}`);
}
const acitivityCardServices = {
  createActivityCard,
  getAll,
  deleteActivityCard,
  updateActivityCard,
  getSpecificActivityCard,
};
export default acitivityCardServices;
