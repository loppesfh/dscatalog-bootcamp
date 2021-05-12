package com.devsuperior.dscatalog.entities;

import java.io.Serializable;

public class Product implements Serializable{

	private static final long serialVersionUID = 1L;
	
	private Long id;
	private String name;
	private String description;
	private Double price;
	private String imgUrl;
	
	private Category category;

}
