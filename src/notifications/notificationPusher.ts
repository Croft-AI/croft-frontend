import { notifications } from "@mantine/notifications";

export enum NotificationType {
  ERROR = "ERROR",
  SUCCESS = "SUCCESS",
  INFORMATION = "INFORMATION",
}

const defaultNotificationsFeat = {
  autoClose: 5000,
  withCloseButton: true,
};

export const pushNotification = (
  notifType: NotificationType,
  errorTitle: string,
  message: string
) => {
  let color = "";
  if (notifType === NotificationType.ERROR) {
    color = "red";
  } else if (notifType === NotificationType.SUCCESS) {
    color = "green";
  } else if (notifType === NotificationType.INFORMATION) {
    color = "gray";
  }
  notifications.show({
    ...defaultNotificationsFeat,
    title: errorTitle,
    color,
    message,
  });
};
