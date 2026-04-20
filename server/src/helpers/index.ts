import crypto from "crypto";
import { environmentVariables } from "../../config";

export function random() {
  const charset =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  const charsetLength = charset.length;

  for (let i = 0; i < 50; i++) {
    const randomIndex = Math.floor(Math.random() * charsetLength);
    result += charset.charAt(randomIndex);
  }

  return result;
}

export function authentication(salt: string, password: string) {
  return crypto
    .createHmac("sha256", [salt, password].join("/"))
    .update(environmentVariables.jwt_sectret)
    .digest("hex");
}

export function buildSortPipeline(
  userId: string,
  query: string,
  filterBy: string,
  isAscending: boolean
) {
  const filteringOrder = isAscending ? 1 : -1;
  const prioritySortOrder = ["Low", "Medium", "High"];

  const pipeline: any[] = [
    {
      $match: {
        userId,
        deleteDate: { $exists: false },
        $or: [
          { title: { $regex: query, $options: "i" } },
          { description: { $regex: query, $options: "i" } },
        ],
      },
    },
  ];

  if (filterBy === "priority") {
    pipeline.push({
      $addFields: {
        prioritySortOrder: {
          $indexOfArray: [prioritySortOrder, "$priority"],
        },
      },
    });
    pipeline.push({ $sort: { prioritySortOrder: filteringOrder } });
    pipeline.push({ $unset: "prioritySortOrder" });
  } else if (filterBy) {
    pipeline.push({ $sort: { [filterBy]: filteringOrder } });
  }

  return pipeline;
}
