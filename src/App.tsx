import {
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  Link,
  Typography,
} from "@mui/material";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { Formik } from "formik";
import * as Yup from "yup";
import { useRef, useState } from "react";
import InputMask from "react-input-mask";

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
  const [isLoading, setIsLoading] = useState(false);
  const nameRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async ({ name, email, cpf, dateBirth }: FormValues) => {
    setIsLoading(true);
    const url = "https://eolj2m7l9zynk5t.m.pipedream.net";
    try {
      await axios({
        method: "POST",
        url,
        data: {
          name,
          email,
          cpf,
          dateBirth,
        },
      });
      alert("Enviado com sucesso!");
    } catch (error) {
      alert("Algum erro aconteceu...");
    } finally {
      setIsLoading(false);
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
        validateOnBlur={true}
        validateOnChange={false}
        onSubmit={async (values, actions) => {
          await handleSubmit(values);
          actions.resetForm();
          nameRef.current?.focus();
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
                <div>
                  <>
                    <input
                      required
                      style={{
                        width: "100%",
                      }}
                      placeholder="Nome *"
                      ref={nameRef}
                      autoFocus
                      onChange={handleChange("name")}
                      value={values.name}
                    />
                    {errors.name ?? null}
                    <input
                      required
                      style={{
                        width: "100%",
                      }}
                      placeholder="Email *"
                      autoComplete="email"
                      onChange={handleChange("email")}
                      value={values.email}
                    />
                    {errors.email ?? null}

                    <InputMask
                      mask="999.999.999.99"
                      maskChar={null}
                      placeholder="CPF *"
                      onChange={handleChange("cpf")}
                      style={{
                        width: "100%",
                      }}
                      value={values.cpf}
                    />
                    {errors.cpf ?? null}
                    <InputMask
                      mask="99/99/9999"
                      maskChar={null}
                      placeholder="Data de nascimento *"
                      onChange={handleChange("dateBirth")}
                      value={values.dateBirth}
                      style={{
                        width: "100%",
                      }}
                    />
                    {errors.dateBirth ?? null}
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                      disabled={isLoading}
                      onClick={() => handleSubmit()}
                    >
                      {isLoading ? "Enviando..." : "Enviar"}
                    </Button>
                    <p>
                      Click no link abaixo para ter mais detalhes sobre o projeto.
                    </p>
                    <Grid container>
                      <Grid item xs>
                        <Link
                          href="https://github.com/iCarlosAugusto/ZulProjectFront"
                          variant="body2"
                        >
                          Github
                        </Link>
                      </Grid>
                    </Grid>
                  </>
                </div>
              </Box>
            </Container>
          </>
        )}
      </Formik>
    </div>
  );
}

export default App;
