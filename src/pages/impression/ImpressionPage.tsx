import {
  query,
  collection,
  doc,
  onSnapshot,
  Timestamp,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import ImpressionEmptyPlaceholder from "../../components/placeholder/ImpressionEmptyPlaceholder";
import LoadingPlaceholder from "../../components/placeholder/LoadingPlaceholder";
import { useAuth } from "../../firebase/auth/AuthContextWrapper";
import { db } from "../../firebase/base";
import {
  getImpressions,
  ImpressionRead,
} from "../../firebase/store/impressionHandler";
import { AccountIs } from "../../limits/AccountLimits";
import usePremiumStatus from "../../stripe/usePremiumStatus";
import ImpressionList from "./ImpressionList";
import ImpressionListItem from "./ImpressionListItem";
import ImpressionTitle from "./ImpressionTitle";
const ImpressionPage = () => {
  const [impressions, setImpressions] = useState<ImpressionRead[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const auth = useAuth();
  const isPremium = usePremiumStatus(auth as string);
  useEffect(() => {
    const loadImpressions = async () => {
      const list = await getImpressions(auth as string);
      setImpressions(list);
      setLoading(false);
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
  useEffect(() => {
    if ((impressions as ImpressionRead[]).length > 0) {
      setLoading(false);
    }
  }, [impressions]);
  return (
    <>
      <div className="flex flex-col flex-grow">
        <ImpressionTitle
          onButtonClick={() => null}
          noOfImpressions={impressions?.length as number}
        />
        <div className="divider text-gray-300">
          {impressions?.length}/
          {isPremium
            ? AccountIs["PREMIUM"].IMPRESSIONS
            : AccountIs["BASIC"].IMPRESSIONS}
        </div>
        <div className="h-full">
          {loading ? (
            <LoadingPlaceholder />
          ) : impressions.length === 0 ? (
            <ImpressionEmptyPlaceholder />
          ) : (
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
          )}
        </div>
      </div>
    </>
  );
};

export default ImpressionPage;
