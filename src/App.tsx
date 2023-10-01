import {
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { Formik } from "formik";
import * as Yup from "yup";

interface FormValues {
  name: string;
  email: string;
  cpf: string;
  dateBirth: string;
}

const validationSchema = Yup.object({
  name: Yup.string().required("Obrigatório"),
  cpf: Yup.string().required("Obrigatório").min(11, "CPF inválido"),
  dateBirth: Yup.string().required("Obrigatório"),
  email: Yup.string().email("Email inválido").required("Obrigatório"),
});
function App() {
  const handleSubmit = async ({ name, email, cpf, dateBirth }: FormValues) => {
    try {
      await axios({
        method: "POST",
        url: "https://eo30cgfy4mgd912.m.pipedream.net",
        data: {
          name,
          email,
          cpf,
          dateBirth,
        },
      });
      alert("Enviado com sucesso!");
    } catch (error) {
      console.log(error);
      alert("Algum erro aconteceu...");
    }
  };

  return (
    <div>
      <Formik
        initialValues={{
          name: "",
          email: "",
          cpf: "",
          dateBirth: "",
        }}
        validationSchema={validationSchema}
        validateOnBlur={false}
        validateOnChange={false}
        onSubmit={(values) => {
          handleSubmit(values);
        }}
      >
        {({ values, errors, handleChange, handleSubmit }) => (
          <>
            <Container component="main" maxWidth="xs">
              <CssBaseline />
              <Box
                sx={{
                  marginTop: 8,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Typography component="h1" variant="h5">
                  Zul's Project
                </Typography>
                <Box sx={{ mt: 1 }}>
                  <>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      label="Nome"
                      autoFocus
                      onChange={handleChange("name")}
                      value={values.name}
                    />
                    {errors.name ?? null}
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      label="Email"
                      autoComplete="email"
                      autoFocus
                      onChange={handleChange("email")}
                      value={values.email}
                    />
                    {errors.email ?? null}
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      label="CPF"
                      autoFocus
                      onChange={handleChange("cpf")}
                      value={values.cpf}
                    />
                    {errors.cpf ?? null}
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      label="Data de nascimento"
                      autoFocus
                      onChange={handleChange("dateBirth")}
                      value={values.dateBirth}
                    />
                    {errors.dateBirth ?? null}
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                      onClick={() => handleSubmit()}
                    >
                      Enviar
                    </Button>
                    <Grid container>
                      <Grid item xs>
                        <Link href="#" variant="body2">
                          Github
                        </Link>
                      </Grid>
                    </Grid>
                  </>
                </Box>
              </Box>
            </Container>
          </>
        )}
      </Formik>
    </div>
  );
}

export default App;
