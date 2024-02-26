import httpRequestDetails from "./basicIrlAxios";
export function createActivityCard(card) {
  return httpRequestDetails.post("/cards/create-activity-card", card);
}
export function getAll() {
  return httpRequestDetails.get("/cards/get-activity-cards");
}
export function deleteActivityCard(id,cardId) {
  return httpRequestDetails.delete(`/cards/delete-activity-cards/${id}?cardId=${cardId}`);
}
export function updateActivityCard(id,cardId, activityCard) {
  return httpRequestDetails.put(
    `/cards/edit-activity-cards/${id}?cardId=${cardId}`,
    activityCard
  );
}
export function updateActivityCardToPaidTrue(id, activityCard) {
  return httpRequestDetails.put(`/cards/payment/${id}`, activityCard, {
    method: "PUT",
    body: JSON.stringify(activityCard),
  });
}
export function getSpecificActivityCard(id,cardId) {
  return httpRequestDetails.get(`/cards/my-activity-cards/${id}?cardId=${cardId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": localStorage.token,
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
