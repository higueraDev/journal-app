import cloudinary from "cloudinary";

import uploadImage from "@/modules/daybook/helpers/uploadImage";
import axios from "axios";

cloudinary.config({
	cloud_name: "higueradev",
	api_key: "482433177497693",
	api_secret: "P4EHt-vlxWyJ0sANymopNfb8s5o",
});
describe("Pruebas en el uploadImage", () => {
	test("Debe cargar un archivo y retornar el url", async (done) => {
		const { data } = await axios.get(
			"https://res.cloudinary.com/higueradev/image/upload/v1653453065/cld-sample.jpg",
			{
				responseType: "arraybuffer",
			}
		);

		const file = new File([data], "foto.jpg");

		const url = await uploadImage(file);

		expect(typeof url).toBe("string");

		const segments = url.split("/");

		const imageId = segments[segments.length - 1].replace(".jpg", "");
		console.log(imageId);
		cloudinary.v2.api
			.delete_resources([imageId], { type: "journal-app" }, () => done())
			.then(console.log);
	});
});
