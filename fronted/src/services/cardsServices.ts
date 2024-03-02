import httpRequestDetails from "./basicIrlAxios";
import { ActivityFormValues } from "../components/createActivityCard";

interface ActivityCardSentToServer {
  activityAddress: string;
  activityDate: string;
  activityDescription: string;
  activityImage?: string;
  activityName: string;
  activityNumber: number;
  activityTime: string;
  bizUserName: string;
  inCalendar: boolean;
  isPaid: boolean;
  phoneNumber: string;
  user_id: string;
  __v?: number;
  _id: string;
}
interface ActivityCardServerSends {
  activityAddress: string;
  activityDate: string;
  activityDescription: string;
  activityImage: string;
  activityName: string;
  activityNumber: number;
  activityTime: string;
  bizUserName: string;
  inCalendar: boolean;
  isPaid: boolean;
  phoneNumber: string;
  user_id: string;
}
interface UserResponse {
  phoneNumber: string;
  biz: boolean;
  name: string;
  password: string;
  createdAt: Date;
  _id?: string | undefined;
}
type ServerResponse =
  | {
      tasks: ActivityCardServerSends[];
      newTask: ActivityCardServerSends;
    }
  | { tasks: ActivityCardServerSends[] }
  | {
      error: string;
    };
export function createActivityCard(card: ActivityFormValues) {
  return httpRequestDetails.post<ActivityCardServerSends | null>(
    "/cards/create-activity-card",
    card
  );
}
export function getAll() {
  return httpRequestDetails.get<ServerResponse & UserResponse>(
    "/cards/get-activity-cards"
  );
}
export function deleteActivityCard(id: string, cardId: string) {
  return httpRequestDetails.delete<ServerResponse>(
    `/cards/delete-activity-cards/${id}?cardId=${cardId}`
  );
}
export function updateActivityCard(
  id: string,
  cardId: string,
  activityCard: Partial<ActivityCardSentToServer>
) {
  return httpRequestDetails.put<ServerResponse>(
    `/cards/edit-activity-cards/${id}?cardId=${cardId}`,
    activityCard
  );
}
export function updateActivityCardToPaidTrue(id, activityCard) {
  return httpRequestDetails.put<ServerResponse>(
    `/cards/payment/${id}`,
    activityCard,
    {
      method: "PUT",
      body: JSON.stringify(activityCard),
    }
  );
}
export function getSpecificActivityCard(id: string, cardId: string) {
  return httpRequestDetails.get<ServerResponse>(
    `/cards/my-activity-cards/${id}?cardId=${cardId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.token,
      },
    }
  );
}
const acitivityCardServices = {
  createActivityCard,
  getAll,
  deleteActivityCard,
  updateActivityCard,
  getSpecificActivityCard,
};
export default acitivityCardServices;
