import apiClient from "./api-client";

interface Entity {
  _id: string;
}

class HttpService {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  getAll<T>() {
    const controller = new AbortController();
    const request = apiClient.get<T[]>(this.endpoint, {
      signal: controller.signal,
    });

    return { request, cancel: () => controller.abort() };
  }

  add<T>(entity: T) {
    return apiClient.post(this.endpoint, entity);
  }

  delete(carId: string) {
    return apiClient.delete(this.endpoint + "/" + carId);
  }

  update<T extends Entity>(entity: T) {
    return apiClient.patch(this.endpoint + "/" + entity._id, entity);
  }
}

const create = (endpoint: string) => new HttpService(endpoint);

export default create;
