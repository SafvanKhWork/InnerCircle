import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Image from "../../img.jpg";

export default function ProductCard(props) {
  return (
    <Box sx={{ minWidth: 2 }}>
      <Card variant="outlined">
        <React.Fragment>
          <CardMedia
            component="img"
            height="164"
            image={Image}
            alt={props.product.name}
          />
          <CardContent>
            <Typography variant="h5" component="div">
              {props.product.name}
            </Typography>

            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {props.product.model}
            </Typography>
            <Typography variant="body2">
              <br />
              {props.product.description}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Learn More</Button>
          </CardActions>
        </React.Fragment>
      </Card>
    </Box>
  );
}
