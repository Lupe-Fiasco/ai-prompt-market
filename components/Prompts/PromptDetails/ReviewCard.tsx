import Ratings from "@/utils/Rating";
import { styles } from "@/utils/styles";
import { Avatar } from "@nextui-org/react";
import { format } from "timeago.js";

export default function ReviewCard({ item }: { item: any }) {
  return (
    <div className="flex my-2">
      <div>
        <Avatar size="lg" src={item?.user?.imageUrl} />
      </div>
      <div className="pl-3">
        <div className="flex items-center">
          <span className={`${styles.label} !text-xl text-white`}>
            {item?.user?.firstName + " " + item?.user.lastName!}
          </span>
          <span className={`${styles.label} pl-3`}>
            {format(item?.createdAt)}
          </span>
          <Ratings rating={item?.rating} />
        </div>
        <p className={`${styles.paragraph} whitespace-pre-line`}>
          {item?.comment}
        </p>
      </div>
    </div>
  );
};

