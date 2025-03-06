export const upload_file = async (file: File) => {
  console.log(file.name);

  return {
    isOk: true,
  };
};
