'use strict';

const webgl = {
	createContext: function( parent ) {
		const width = parent.offsetWidth;
		const height = parent.offsetHeight;
		const canvas = document.createElement( "canvas" );
		parent.style.position = "relative";
		parent.style.overflow = "hidden";
		canvas.width = width;
		canvas.height = height;
		canvas.style.left = "0";
		canvas.style.top = "0";
		canvas.style.position = "absolute";
		parent.appendChild( canvas );
		const gl = canvas.getContext( "webgl" );
		gl.viewport( 0, 0, width, height );
		return gl;
	},

	createShader: function( gl, type, script ) {
		const shader = gl.createShader( type );
		gl.shaderSource( shader, script );
		gl.compileShader( shader );
		if( !gl.getShaderParameter( shader, gl.COMPILE_STATUS ) ) {
			throw new Error( "error in shader: " + gl.getShaderInfoLog( shader ) );
		}
		return shader;
	},

	createProgram: function( gl, shaders ) {
		const program = gl.createProgram();
		for( const shader of shaders ) {
			gl.attachShader( program, shader );
		}
		gl.linkProgram( program );
		if( !gl.getProgramParameter( program, gl.LINK_STATUS ) ) {
			throw new Error( "Could not initialise shaders" );
		}
		return program;
	}
};