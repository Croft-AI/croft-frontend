import {
  query,
  collection,
  doc,
  onSnapshot,
  Timestamp,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../firebase/auth/AuthContextWrapper";
import { db } from "../../firebase/base";
import {
  getImpressions,
  ImpressionRead,
} from "../../firebase/store/impressionHandler";
import ImpressionList from "./ImpressionList";
import ImpressionListItem from "./ImpressionListItem";
import ImpressionTitle from "./ImpressionTitle";
const ImpressionPage = () => {
  const [impressions, setImpressions] = useState<ImpressionRead[]>();
  const [loading, setLoading] = useState<boolean>(false);
  const auth = useAuth();
  useEffect(() => {
    const loadImpressions = async () => {
      const list = await getImpressions(auth as string);
      setImpressions(list);
    };
    loadImpressions();
  }, []);
  useEffect(() => {
    const queryForImpressions = query(
      collection(db, "impression"),
      where("createdBy", "==", auth)
    );

    onSnapshot(queryForImpressions, (querySnapshot) => {
      let currImpressions: ImpressionRead[] = [];
      querySnapshot.forEach((doc) => {
        currImpressions.push({ id: doc.id, ...doc.data() } as ImpressionRead);
      });
      setImpressions(currImpressions);
    });
  }, []);
  useEffect(() => setLoading(false), [impressions]);
  return (
    <>
      <div className="flex flex-col">
        <ImpressionTitle onButtonClick={() => console.log("fart")} />
        <div className="h-96">
          <ImpressionList>
            {impressions !== undefined ? (
              impressions.map((item) => (
                <ImpressionListItem
                  impressionId={item.id}
                  path={`./${item.id}`}
                  title={item.title}
                  createdOn={item.createdOn.toDate()}
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
