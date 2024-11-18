function wrapPromise<T>(promise: Promise<T>) {
  type Status = "pending" | "success" | "error";
  let status: Status = "pending";
  let response: T | unknown;

  const suspender = promise.then(
    (res) => {
      status = "success";
      response = res;
    },
    (err) => {
      status = "error";
      response = err;
    }
  );

  const handler: Record<Status, () => T | never> = {
    pending: () => {
      throw suspender;
    },
    error: () => {
      throw response;
    },
    success: () => response as T,
  };

  const read = (): T => {
    return handler[status]();
  };

  return { read };
}

export default wrapPromise;
