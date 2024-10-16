const convertObjToFormData = (obj: Record<string, any>) => {
	const newFormData = new FormData();
	Object.entries(obj).forEach(([k, v]) => {
		if (Array.isArray(v)) {
			v.forEach((item) => newFormData.append(k, item));
		} else {
			newFormData.append(k, v);
		}
	});
	return newFormData;
};

export default convertObjToFormData;
