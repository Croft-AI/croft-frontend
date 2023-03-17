import React, { useEffect, useState } from "react";
import { useAuth } from "../../firebase/auth/AuthContextWrapper";
import {
  getImpressions,
  ImpressionRead,
} from "../../firebase/store/impressionHandler";
import ImpressionList from "./ImpressionList";
import ImpressionListItem from "./ImpressionListItem";
import ImpressionTitle from "./ImpressionTitle";
const ImpressionPage = () => {
  const [impressions, setImpressions] = useState<ImpressionRead[]>();
  const auth = useAuth();
  useEffect(() => {
    const loadImpressions = async () => {
      const list = await getImpressions(auth as string);
      setImpressions(list);
    };
    loadImpressions();
  }, []);

  return (
    <>
      <div className="flex flex-col">
        <ImpressionTitle onButtonClick={() => console.log("fart")} />
        <div className="h-96">
          <ImpressionList>
            {impressions !== undefined ? (
              impressions.map((item) => (
                <ImpressionListItem
                  path={`./${item.id}`}
                  title={item.title}
                  createdOn={item.createdOn}
                />
              ))
            ) : (
              <></>
            )}
          </ImpressionList>
        </div>
      </div>
    </>
  );
};

export default ImpressionPage;
